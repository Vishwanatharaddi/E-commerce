import { useRef } from "react";
import classes from "./Contactus.module.css";

function Contactus() {
  const titleRef = useRef(null);
  const openingTextRef = useRef(null);
  const releaseDateRef = useRef(null);

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      name: titleRef.current.value,
      message: openingTextRef.current.value,
      email: releaseDateRef.current.value,
    };

    console.log(movie);
    // window.location.reload();
    addMovieHandler(movie);
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  }

  async function addMovieHandler(movie) {
    try {
      const response = await fetch(
        "https://react-http-d8382-default-rtdb.firebaseio.com/contact.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={`container`}>
      <h1 className="text-center">Contact us</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Name</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">email</label>
          <input type="text" id="email" ref={releaseDateRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="opening-text">Message</label>
          <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
        </div>

        <button>Send Message</button>
      </form>
    </div>
  );
}

export default Contactus;
