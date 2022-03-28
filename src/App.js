import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./App.css";
import "./css/Header.css";
import "./css/Content.css";
import "./css/Article.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url);
  console.log({ photos });
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const reponse = await fetch(
              `https://api.unsplash.com/search/photos?per_page=10&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID 7D-0T9Nvc54PGNCo2U7WBsz57iDRxcTfO_SoDlzmmQw",
                },
              }
            );
            const data = await reponse.json();
            //llamar a unsplash
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
