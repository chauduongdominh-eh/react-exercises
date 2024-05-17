import { NavLink, Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={'/timer'}>Timer</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { MainLayout };
