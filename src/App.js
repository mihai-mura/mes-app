import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './pages/start/Start';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Main from './pages/interface/Main';
import { LoggedUser, Friends, SelectedFriend, Messages } from './AppContext';

function App() {
	return (
		<Router>
			<LoggedUser>
				<Routes>
					<Route exact path='/' element={<Start />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/register' element={<Register />} />
					<Route
						exact
						path='/mes'
						element={
							<Friends>
								<SelectedFriend>
									<Messages>
										<Main />
									</Messages>
								</SelectedFriend>
							</Friends>
						}
					/>
				</Routes>
			</LoggedUser>
		</Router>
	);
}

export default App;
