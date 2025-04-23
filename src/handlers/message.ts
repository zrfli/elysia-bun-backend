const numberList = ["905312106755"];

export async function sendOTPCodeWithWhatsappText() {
    const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '905312106755',
            type: 'text',
            text: {
                body: `${Math.floor(Math.random() * 1111111)} is your verification code.`
            }
        }),
      }
    );
  
    const result = await response.json();
    return result;
}

export async function sendOTPCodeWithWhatsappTeamplate() {
    const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: '905312106755',
          type: 'template',
          template: {
            name: 'academic_calendar_tr',
            language: { code: 'tr'},
            components: [
              {
                type: "header",
                parameters: [
                  {
                    type: "text",
                    text: "Akademik Takvim"
                  }
                ]
              },
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: "Hacettepe Üniversitesi"
                  },
                  {
                    type: "text",
                    text: "2025-2026"
                  },
                ]
              },
              {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [
                  {
                    "type": "payload",
                    "payload": "8ba04d58-ff2d-4f80-811b-29d368968265/main/2024-2025-EgiTiM--ogRETiM-YILI-AKADEMiK-TAKViM.pdf"
                  }
                ]
              }
            ]
          }}
        )
      }
    );
  
    const result = await response.json();
    return result;
  }

export async function sendOTPCodeWithWhatsapp() {
  const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '905312106755',
        type: 'template',
        template: {
          name: 'exam_information_tr',
          language: { code: 'tr'},
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "text",
                  text: "Sınav Takvimi"
                }
              ]
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: "Hacettepe Üniversitesi"
                },
                {
                  type: "text",
                  text: "2025-2026"
                },
                {
                  type: "text",
                  text: "Güz"
                },
              ]
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                {
                  "type": "payload",
                  "payload": "8ba04d58-ff2d-4f80-811b-29d368968265/main/2024-2025-EgiTiM--ogRETiM-YILI-AKADEMiK-TAKViM.pdf"
                }
              ]
            }
          ]
        }}
      )
    }
  );

  const result = await response.json();
  return result;
}

export async function sendOTPCodeWithWhatsap() {
  const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: "individual",
        to: numberList,
        type: 'document',
        document: {
          filename: 'Akademik Takvim 2024-2025',
          link: 'https://cmspanel.yeniyuzyil.edu.tr/uploaded/files/2024-2025-EgiTiM--ogRETiM-YILI-AKADEMiK-TAKViM.pdf',
        }
      }),
    }
  );

  const result = await response.json();
  return result;
}

export async function sendOTPCodeWithWhatsappOTP() {
const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: '905312106755',
      type: 'template',
      template: {
        name: 'otp_auth_code_tr',
        language: { code: 'tr'},
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: otpCode
              },
            ]
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                "type": "payload",
                "payload": otpCode
              }
            ]
          }
        ]
      }}
    )
  }
);

const result = await response.json();
return result;
}

export async function sendOTPCodeWithWhatsappImage() {
  const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '905312106755',
        type: 'template',
        template: {
          name: 'image_information_tr ',
          language: { code: 'tr'},
          components: [
            {
              type: "header",
              parameters: [
                {
                  type:"image",
                  "image": {
                    "link": "https://www.yeniyuzyil.edu.tr/_next/image?url=%2Fassets%2Fimages%2Fpopup%2Framazan-bayrami.jpeg&w=3840&q=75",
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: "İyi bayramlar.s"
                }
              ]
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                {
                  "type": "payload",
                  "payload": "8ba04d58-ff2d-4f80-811b-29d368968265/main/2024-2025-EgiTiM--ogRETiM-YILI-AKADEMiK-TAKViM.pdf"
                }
              ]
            }
          ]
        }}
      )
    }
  );

  const result = await response.json();
  return result;
}

export async function sendOTPCodeWithWhatsapDocument() {
  const response = await fetch('https://graph.facebook.com/v22.0/640924552429475/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '905312106755',
        type: 'template',
        template: {
          name: 'document_information_tr ',
          language: { code: 'tr'},
          components: [
            {
              type: "header",
              parameters: [
                {
                  type:"document",
                  "document": {
                    "link": "https://www.nisantasi.edu.tr/Uploads/2024_2025_%C4%B0%C4%B0SBF_G%C3%BCz_D%C3%B6nemi_Ara_S.pdf",
                    filename: "Mazeret sınavı listesi"
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: "Mazeret sınavı listesi yayınlanmıştır!"
                }
              ]
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                {
                  "type": "payload",
                  "payload": "8ba04d58-ff2d-4f80-811b-29d368968265/main/2024-2025-EgiTiM--ogRETiM-YILI-AKADEMiK-TAKViM.pdf"
                }
              ]
            }
          ]
        }}
      )
    }
  );

  const result = await response.json();
  console.log(result)
  return result;
}
