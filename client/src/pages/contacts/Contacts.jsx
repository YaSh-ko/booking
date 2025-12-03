import { Header } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import "./contacts.scss";

export const Contacts = () => {
  return (
    <div className="contacts-page">
      <Header />
      <main className="contacts-page__content">
        <div className="contacts-section">
          <div className="Yakov"> 
            <img
              src="/Images/Yakov.jpg"
              alt="Яков"
              className="Yakov-img"
            />
            <p><strong>Backend-разработчик</strong></p>
            <p>Отвечает за серверную логику, API и всё, что делает сервис быстрым и надёжным.</p>
            <strong><p>ТГ: @Yakov255</p></strong>
          </div>


          <div className="Alex"> 
            <img
              src="/Images/Alex.jpg"
              alt="Алексей"
              className="Alex-img"
            />
            <p><strong>Frontend-разработчик</strong></p>
            <p>Создаёт внешний вид сервиса, делает интерфейс удобным и адаптирует дизайн в код.</p>
            <strong><p>ТГ: @jst_imu</p></strong>
          </div>


          <div className="Petr"> 
            <img
              src="/Images/Petr.jpg"
              alt="Петр"
              className="Petr-img"
            />
            <p><strong>Разработчик баз данных</strong></p>
            <p>Проектирует структуру данных, следит за их безопасностью и стабильной работой системы.</p>
            <strong><p>ТГ: @E1UXY</p></strong>
          </div>
        </div>
        
        <div className="text-section">
          <p>Нас трое, и каждый отвечает за свою магию: один приручает базы данных, второй создаёт надёжный backend,
             а третий делает интерфейсы понятными и живыми. Вместе мы собираем проект как пазл — аккуратно, внимательно и с удовольствием. 
             Нам важно, чтобы продукт не просто работал, а приносил удовольствие каждому, кто им пользуется.
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
};
