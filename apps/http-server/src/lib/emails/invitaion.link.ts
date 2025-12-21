export type InviteEmailTemplateArgs = {
    appName: string;
    inviterName: string;   // e.g. "Tanush"
    workspaceName: string; // e.g. "ContentFlux Team"
    inviteUrl: string;     // The link with the token
    expiresInMinutes?: number;
};

export function inviteEmailHtml({
    appName,
    inviterName,
    workspaceName,
    inviteUrl,
    expiresInMinutes = 10
}: InviteEmailTemplateArgs) {
    return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Join ${workspaceName} on ${appName}</title>
  </head>
  <body style="margin:0;background:#f6f7fb;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
      
      <div style="text-align:center;margin-bottom:20px;font-weight:bold;color:#111;font-size:18px;">
        ${appName}
      </div>

      <div style="background:#ffffff;border-radius:16px;padding:32px;border:1px solid #eceef5;box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        
        <div style="text-align:center;margin-bottom:20px;">
             <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:#eff6ff;color:#2563eb;border-radius:50%;font-size:24px;">
               👋
             </div>
        </div>

        <h2 style="margin:0 0 12px;color:#111;text-align:center;font-size:20px;font-weight:600;">
          Join ${inviterName} in ${workspaceName}
        </h2>
        
        <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;text-align:center;font-size:15px;">
          You have been invited to collaborate on <strong>${workspaceName}</strong>. Accept the invitation to start creating projects and posts together.
        </p>

        <div style="text-align:center;margin-bottom:24px;">
          <a href="${inviteUrl}" target="_blank" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 32px;border-radius:8px;transition:background 0.2s;">
            Accept Invitation
          </a>
        </div>

        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;text-align:center;">
          This link will expire in ${expiresInMinutes} minutes.
        </p>

        <div style="margin-top:24px;border-top:1px solid #f3f4f6;padding-top:16px;">
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.4;text-align:center;">
              If you were not expecting this invitation, you can safely ignore this email.
            </p>
        </div>
      </div>

      <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;text-align:center;">
        © ${new Date().getFullYear()} ${appName}
      </p>
    </div>
  </body>
</html>`;
}