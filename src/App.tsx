import React, { useEffect } from 'react';
import './App.scss';
import { RoutesProject } from './components/HomePage/RoutesProject';
import { useDispatch, useSelector } from 'react-redux';
import { userEmail, userToken } from './storeToolkit/userSlice';
import { RootState } from './storeToolkit';

const App: React.FC =() =>{
  const dispatch = useDispatch();

  const userFromRedux = useSelector((state: RootState) => state.userMe.user);
  const activeModal = useSelector((state: RootState) => state.logReg.modalAction);
  const isLog = useSelector((state: RootState) => state.logReg.isLog);

  useEffect(() => {
    if (isLog && JSON.stringify(userFromRedux) === `{"token":"","email":""}`) {
        dispatch(userEmail(localStorage.getItem('loginUser')!));
        dispatch(userToken(localStorage.getItem('token')!));
    }
  }, [activeModal, isLog]);

  return (
    <div className="App">
      <div className='App__container'>
        <RoutesProject />
      </div>
    </div>
  );
}

export default App;
