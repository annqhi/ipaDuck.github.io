document.body.classList.add('no-scroll');

window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    document.body.classList.remove('no-scroll');
    preloader.classList.add('hidden');
    preloader.addEventListener('transitionend', () => {
      preloader.style.display = 'none';
    }, { once: true });
  }, 1500);
});

let licenseAccepted = false;

const modal = document.createElement('div');
modal.className = 'modal-overlay';
modal.innerHTML = `
  <div class="modal-content">
    <h3>Лицензионное соглашение</h3>
    <div class="license-text">
      <strong>Срок действия и прекращение действия</strong>
      Apple может прекратить или приостановить действие вашего статуса в качестве зарегистрированного Разработчика Apple в любое время по своему собственному усмотрению. Если Apple прекращает действие вашего статуса в качестве зарегистрированного Разработчика Apple, Apple сохраняет за собой право отказать вам в рассмотрении повторной заявки в любое время по своему собственному усмотрению. Вы можете прекратить свое участие в качестве зарегистрированного Разработчика Apple в любое время и по любой причине, письменно уведомив Apple о данном намерении. При любом прекращении действия или, по усмотрению Apple, приостановлении действия вашего статуса все права и лицензии, предоставленные вам Apple, будут прекращены, в том числе ваше право на осуществление доступа к Сайту, и вы соглашаетесь уничтожить любую и всю Конфиденциальную информацию Apple, которая находится в вашем распоряжении или которой вы управляете. По запросу Apple вы соглашаетесь предоставить Apple подтверждение такого уничтожения. Возврат или частичное возмещение каких-либо сборов, уплаченных по настоящему Соглашению, или любых других сборов не будет производиться ни по какой причине.
    </div>
    <button class="accept-button">Принять соглашение</button>
  </div>
`;
document.body.appendChild(modal);

document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '×';
  modal.querySelector('.modal-content').appendChild(closeButton);

  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((section, sectionIndex) => {
    const cards = section.querySelectorAll('.cert-card');

    if (sectionIndex === 0) {
      const allDeviceCards = section.querySelectorAll('.device-cards');

      allDeviceCards.forEach(deviceCards => {
        const cards = deviceCards.querySelectorAll('.cert-card');
        const isIpad = deviceCards.classList.contains('ipad');

        cards.forEach((card, index) => {
          const buyButton = card.querySelector('.buy-button');
          if (buyButton) {
            const redirectUrls = isIpad ? [
              'https://t.me/personalcert_bot?start=item_152558',
              'https://t.me/personalcert_bot?start=item_152555',
              'https://t.me/personalcert_bot?start=item_152561',
              'https://t.me/personalcert_bot?start=item_152562'
            ] : [
              'https://t.me/personalcert_bot?start=item_152552',
              'https://t.me/personalcert_bot?start=item_152553',
              'https://t.me/personalcert_bot?start=item_152554',
              'https://t.me/personalcert_bot?start=item_152557'
            ];

            buyButton.addEventListener('click', (e) => {
              e.preventDefault();
              modal.classList.add('active');
              document.body.classList.add('no-scroll');

              const acceptButton = modal.querySelector('.accept-button');
              acceptButton.onclick = () => {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                window.location.href = redirectUrls[index];
              };
            });
          }
        });
      });
    } else if (sectionIndex === 1) {
      const gboxUrls = [
        'https://t.me/personalcert_bot?start=item_152565',
        'https://t.me/personalcert_bot?start=item_152566',
        'https://t.me/personalcert_bot?start=item_152567'
      ];

      cards.forEach((card, index) => {
        const buyButton = card.querySelector('.buy-button');
        if (buyButton) {
          buyButton.addEventListener('click', () => {
            window.location.href = gboxUrls[index];
          });
        }
      });
    } else if (sectionIndex === 2) {
      const vpnUrls = [
        'https://t.me/personalcert_bot?start=item_158301',
        'https://t.me/personalcert_bot?start=item_158541',
        'https://t.me/personalcert_bot?start=item_158544',
        'https://t.me/personalcert_bot?start=item_158547'
      ];

      cards.forEach((card, index) => {
        const buyButton = card.querySelector('.buy-button');
        if (buyButton) {
          buyButton.addEventListener('click', () => {
            window.location.href = vpnUrls[index];
          });
        }
      });
    }
  });

  const deviceButtons = document.querySelectorAll('.device-button');
  const deviceCards = document.querySelectorAll('.device-cards');

  deviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const device = button.dataset.device;

      deviceButtons.forEach(btn => btn.classList.remove('active'));
      deviceCards.forEach(cards => cards.classList.remove('active'));

      button.classList.add('active');
      document.querySelector(`.device-cards.${device}`).classList.add('active');
    });
  });

  const accordionButtons = document.querySelectorAll('.accordion-header');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const wasActive = button.classList.contains('active');
      button.classList.toggle('active');
      content?.classList.toggle('active');

      if (!wasActive) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = button.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 200);
      }
    });
  });

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const images = document.querySelectorAll('img');
  if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
      img.loading = 'lazy';
    });
  }
});