// Vercel Serverless Function：检查/核销一次性 token
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

module.exports = async (req, res) => {
  try {
    const { method, query } = req;
    const token = (query.token || '').trim();
    if (!token) return res.status(400).json({ ok:false, reason:'missing_token' });

    if (method === 'GET') {
      const { data, error } = await supabase
        .from('tokens')
        .select('used')
        .eq('token', token)
        .maybeSingle();
      if (error) return res.status(500).json({ ok:false, reason:'server_error' });
      if (!data) return res.status(200).json({ ok:false, reason:'invalid' });
      if (data.used) return res.status(200).json({ ok:false, reason:'used' });
      return res.status(200).json({ ok:true });
    }

    if (method === 'POST') {
      const { data, error } = await supabase
        .from('tokens')
        .update({ used: true, used_at: new Date().toISOString() })
        .eq('token', token)
        .eq('used', false)
        .select('token')
        .maybeSingle();
      if (error) return res.status(500).json({ ok:false, reason:'server_error' });
      if (!data) return res.status(200).json({ ok:false, reason:'used_or_invalid' });
      return res.status(200).json({ ok:true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end('Method Not Allowed');
  } catch (e) {
    return res.status(500).json({ ok:false, reason:'server_crash' });
  }
};
