import React from 'react';

import NavigationBar from "../NavigationBar";

export default function Home({userInfo}) {

  return (
    <div>
      <NavigationBar/>
      <div>Home body</div>
      <div>{userInfo.name}</div>
    </div>
  );
}
