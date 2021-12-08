import './main.css';
import MainLeftPanel from '../../components/MainLeftPanel';
import MainRightPanel from '../../components/MainRightPanel';

function Main() {

    return (
        <div className="page_main">
            <MainLeftPanel />
            <MainRightPanel />
        </div>
    );
}

export default Main;