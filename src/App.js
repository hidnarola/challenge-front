import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home'
import BooksDetails from './components/Book-detail/book-detail'




function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Books/:id" component={BooksDetails} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
