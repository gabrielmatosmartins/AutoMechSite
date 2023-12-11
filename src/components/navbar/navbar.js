import { CadastreSe } from "../cadastreSe/cadastreSe";
import {Login} from '../login/login';

export function NavBar(){
    return (
        <div className="layout">
            <div className="overlap">
                <img className="rectangle" alt="Rectangle" src="https://c.animaapp.com/ZjIkw4ir/img/rectangle.png" />
                <img className="logo" alt="Logo" src="https://c.animaapp.com/ZjIkw4ir/img/logo.png" />
                <div className="group">
                <div className="component">
                    <div className="overlap-group-2">
                    <img className="mask-group" alt="Mask group" src="https://c.animaapp.com/ZjIkw4ir/img/mask-group-1.png" />
                    </div>
                </div>
                </div>
                <CadastreSe className="cadastre-se-instance" />
                <Login className="login-instance" />
                <img className="line" alt="Line" src="https://c.animaapp.com/ZjIkw4ir/img/line-2.png" />
                <img className="home" alt="Home" src="https://c.animaapp.com/ZjIkw4ir/img/home.png" />
                <img className="oramento" alt="Oramento" src="https://c.animaapp.com/ZjIkw4ir/img/or-amento.png" />
                <img className="servios" alt="Servios" src="https://c.animaapp.com/ZjIkw4ir/img/servi-os.png" />
                <img className="feedback" alt="Feedback" src="https://c.animaapp.com/ZjIkw4ir/img/feedback.png" />
            </div>
        </div>
    );
}