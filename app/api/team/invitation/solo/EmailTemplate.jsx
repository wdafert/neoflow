export const EmailTemplate = ({ link, team, neolink }) => (
    <div style={{ backgroundColor: '#ffffff', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' }}>
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ maxWidth: '560px', margin: '0 auto', padding: '20px 0 48px' }}>
            <tbody>
                <tr style={{ width: '100%' }}>
                    <td>

                        <h1 style={{ fontSize: '24px', letterSpacing: '-0.5px', lineHeight: '1.3', fontWeight: '400', color: '#484848', padding: '17px 0 0' }}>
                            <svg style={{ height: '40px' }} width="55" height="87" viewBox="0 0 55 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect className="stroke-primary/80" x="14.4954" y="0.998303" width="18" height="60" rx="9" transform="rotate(13 14.4954 0.998303)" stroke="#0180cf" strokeWidth="5" />
                                <rect className="stroke-primary/80" x="36.4954" y="22.9983" width="18" height="60" rx="9" transform="rotate(13 36.4954 22.9983)" stroke="#0180cf" strokeWidth="5" />
                            </svg>
                            🪄 Invitation: Join {team} on Neoflow
                        </h1>
                        <p style={{ fontSize: '15px', lineHeight: '1.4', margin: '0 0 15px', color: '#3c4149' }}>
                            Join their team to collaborate on their projects and become an integral part of their community 💪.
                            <br />
                            <br />
                            To accept the invitation and join their team, click on the following button
                        </p>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ padding: '10px 0 27px' }}>
                            <tbody>
                                <tr>
                                    <td><a href={link} style={{ backgroundColor: '#0180cf', borderRadius: '3px', fontWeight: '600', color: '#fff', fontSize: '15px', textDecoration: 'none', textAlign: 'center', display: 'inline-block', padding: '11px 23px 11px 23px', lineHeight: '100%', maxWidth: '100%' }} target="_blank"><span></span><span style={{ maxWidth: '100%', display: 'inline-block', lineHeight: '120%', msoPaddingAlt: '0px', msoTextRaise: '8.25px' }}>Join {team} ✅</span><span></span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #eaeaea', borderColor: '#dfe1e4', margin: '26px 0 26px' }} />
                        <a href={neolink} style={{ color: '#b4becc', textDecoration: 'none', fontSize: '14px' }} target="_blank">Neoflow</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);
