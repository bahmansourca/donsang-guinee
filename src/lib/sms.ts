export async function sendSms(to: string, body: string): Promise<{ ok: boolean; error?: string }>{
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) {
    return { ok: false, error: "Twilio non configuré" };
  }
  try {
    const twilio = (await import("twilio")).default;
    const client = twilio(sid, token);
    await client.messages.create({ from, to, body });
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Erreur SMS" };
  }
}


