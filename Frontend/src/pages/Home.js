import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Home() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <>
    <Navbar/>
    <div>
      {isLoggedIn ? <h1>Welcome back, {username}</h1> : <h1>Welcome to the Home Page</h1>}
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>
      <p>This is the home page, yes, trully, it is.</p>

    </div>
    </>
  );
}

export default Home;
