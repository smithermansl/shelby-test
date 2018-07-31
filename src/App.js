import React from 'react';

const App = () =>
  <div>
    <header>
      <h1>Welcome to the Clark Take-Home Code Challenge</h1>
    </header>
    <p>
      Take a look at <code>src/data.js</code>. This is an approximation of what normalized billing data from our API looks like.
    </p>
    <p>
      For this exercise, we'd like you to do the following:
      <ul>
        <li>
          calculate the total amount billed in dollars
        </li>
        <li>
          calculate the total amount paid in dollars
        </li>
        <li>
          calculate the total amount overdue (unpaid) in dollars
        </li>
        <li>
          calculate the total amount outstanding (not due yet, not paid yet) money in dollars.
        </li>
        <li>
          render these values to the screen along with an ordered list of the bills sorted by date and by category (outstanding, overdue, paid) - see the attached screenshot for reference.
        </li>
      </ul>
    </p>
    <p>
      Please test your work as you see fit, use git commits, and if you're comfortable use Flow to add type annotations.
    </p>
    <p>
      Feel free to use any resources and packages available to you, including <a href="https://github.com/hiclark/clark-utils">clark-utils</a>.
    </p>
    <p>
      When you've finished, zip your completed challenge and email it back to us.
    </p>
    <p>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <p>
      If you have any questions, please reach out!
    </p>
  </div>

export default App;
