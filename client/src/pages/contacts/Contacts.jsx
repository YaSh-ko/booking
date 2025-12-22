import { Header } from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import './contacts.scss';

export const Contacts = () => {
  return (
    <div className="contacts-page">
      <Header />
      <main className="contacts-page__content">
        <div className="contacts-section">
          {/* Яков */}
          <div className="developer-card">
            <img src="/Images/Yakov.jpg" alt="Яков" className="developer-img" />
            <h3 className="developer-name">Яков</h3>
            <p className="developer-role">
              <strong>Frontend-разработчик</strong>
            </p>
            <p className="developer-desc">
              Занимался фронтендом, связывал фронт и бэк, обеспечивал плавную работу
              интерфейса с сервером.
            </p>
            <p className="developer-contact">
              <strong>ТГ: @Yakov255</strong>
            </p>
          </div>

          {/* Алексей */}
          <div className="developer-card">
            <img src="/Images/Alex.jpg" alt="Алексей" className="developer-img" />
            <h3 className="developer-name">Алексей</h3>
            <p className="developer-role">
              <strong>Frontend-разработчик</strong>
            </p>
            <p className="developer-desc">
              Занимался фронтендом, разработкой дизайна и созданием макетов. Делал
              интерфейс красивым, удобным и адаптивным.
            </p>
            <p className="developer-contact">
              <strong>ТГ: @jst_imu</strong>
            </p>
          </div>

          {/* Петр */}
          <div className="developer-card">
            <img src="/Images/Petr.jpg" alt="Петр" className="developer-img" />
            <h3 className="developer-name">Петр</h3>
            <p className="developer-role">
              <strong>Backend-разработчик</strong>
            </p>
            <p className="developer-desc">
              Занимался бэкендом и базами данных. Проектировал структуру, обеспечивал
              безопасность, скорость и стабильность работы системы.
            </p>
            <p className="developer-contact">
              <strong>ТГ: @E1UXY</strong>
            </p>
          </div>
        </div>

        <div className="text-section">
          <p>
            Нас трое, и каждый отвечает за свою магию: один приручает базы данных, второй
            создаёт дизайн и макеты, а третий связывает всё воедино. Вместе мы собираем
            проект как пазл — аккуратно, внимательно и с удовольствием. Нам важно, чтобы
            продукт не просто работал, а приносил удовольствие каждому, кто им пользуется.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
