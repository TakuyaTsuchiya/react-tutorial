import { useEffect, useState } from "react";
import { fetchImages } from "./api";

const Header = () => {
  return (
    <header>
      <h1 className="title">Cute Dog Images</h1>
    </header>
  );
};

const Image = (props) => {
  return (
    <figure>
      <img src={props.src} alt="cute dog!" />
    </figure>
  );
};

const Loading = () => {
  return <p>loadしています</p>;
};

const Gallery = (props) => {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div>
      {urls.map((url) => {
        return (
          <div key={url}>
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
};

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { breed } = e.target.elements;
    props.onFormSubmit(breed.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <select name="breed" defaultValue="shiba">
        <option value="shiba">柴犬</option>
        <option value="akita">秋田犬</option>
      </select>
      <button type="submit">リロードする</button>
    </form>
  );
};

const Main = () => {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);
  const reloadImages = (breed) => {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  };
  return (
    <main>
      <section>
        <div>
          <Form onFormSubmit={reloadImages} />
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
};

const Footer = () => {
  return (
    <footer>
      <div>
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
};

export const App = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
