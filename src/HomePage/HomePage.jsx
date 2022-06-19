import React from 'react';
import Chart from "./Chart";
import {adminService} from "../_services";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            ssl: '',
            restoreFile:''
        };
        this.handleRestoreChange = this.handleRestoreChange.bind(this);
    }

    handleRestoreChange(event){
        this.setState({ restoreFile: event.target.value });
    }

    componentDidMount() {
        adminService.getRole()
            .then(res => res.json())
            .then(result => this.setState({role : result}))

        adminService.getSsl()
            .then(res => res.json())
            .then(result => this.setState({ssl : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        if (!Boolean(this.state.role)) {
            return (
                <div className="portfolio-wrap">
                    <div className="portfolio-item">
                        <div className="portfolio-item-wrap">
                            <a href="">
                                <img src="https://shop-cdn1.vigbo.tech/shops/186854/products/20317118/images/2-e04f863f9be7d07c9b30499aee7e3a26.jpg"/>
                                <div className="portfolio-item-inner">
                                    <div className="portfolio-heading">
                                        <h3><a href="/owners" id="owners">Owners</a></h3>
                                    </div>
                                    <ul>
                                        <li>Animals</li>
                                        <li>Appointments</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="portfolio-item">
                        <div className="portfolio-item-wrap">
                            <a href="">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb4ixC3vJQx7Vbh3-1vXpqdYSl0Rh9FjoN3mrf_44ItKTPOqpTeCWwUtQ-S17Pxj0xUMM&usqp=CAU"/>
                                <div className="portfolio-item-inner">
                                    <div className="portfolio-heading">
                                        <h3><a href="/doctors" id="doctors">Doctors</a></h3>
                                    </div>
                                    <ul>
                                        <li>Schedule</li>
                                        <li>Apointments</li>
                                        <li>Visitings</li>
                                        <li>Directions</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="portfolio-item">
                        <div className="portfolio-item-wrap">
                            <a href="">
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhUYGBgYGhgYGBgYGBgYGBgYGBgZGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGBESGDQhGCE0NDQ0NDQxMT80ND80NDQ0NDc0PzE0MT8/Pz80NDQ/NDQxPTQ0MTExNDE0PzExNDRAMf/AABEIAPoAyQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQYAB//EAD8QAAIBAwIEAggEBAQFBQAAAAECAAMRIQQxBRJBUWFxBiIygZGxwfATFKHRB0Lh8RYkYnIjM4KishU0UmOS/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAHxEBAQACAgMBAQEAAAAAAAAAAAECEQMSBDFBISJR/9oADAMBAAIRAxEAPwD6cTIM8TIkHjBsZLGVIgVMi8kiRaBVhBw1oJxAGZ4zxnjAienry1NCxsBAgS4j1Dh1942mgQdIRimVJm62gXtFqnDQdsQrL5pAMLX0zJuICARWhgYBTCLMiXMFzS9SAJzFah2k8YVojSaNoYKLPSt5N4R6VMtBtNIrL2lVhFEQBInoR0vtuZV15TYyilpRxCmCqQgRlWl4MiQXoUC5xNvTacKMQGgpWGd46+2JKoiiUNUA2Ji2i1BYWbDKbN9CPOGqUlYgnceNpAfmnpl8R1H4Q5r+r7yYnp+Oqxtn+neXZpt1qYYWMwdTQKkzUTVBsg4k1qQcHrEppiiXWeqoR0kKZR6pAGGcxczNag6GMo8TQwqmRTitLXiyPL88uwcypljBGaYXlxKLCCBSq4D0/F7f9pP0g9V7XxMW4zU5PwW6CsgP/UeX6xzVJ658flDUDoNzDO/SRUpmMaemAPme8La58o2mUZbLaRT3EtWMGj2MrLaaoFzDGpcRO3MvnAaVyl0Y3G6+A7TNV7WVGU8y2v8AOJ/4gQXBNiMEHp5d4fWVFIJBnEcXYhibAi9sHN/KZ21Jt1Go4wr3F7g+ObeU5nW02RxykkE3B7A9DaZ+icl7C82qhJS5/lItfrnb5zG/jp102OFMVX2iB1uT9J0vDnuvn1nH/icqrZuQXG5tfrbxmxpuKKiAd9u3xm5WMo0OIUr5mYDNWjVDrfvEdTQIJM2wAxgGhiYKtM1qPIYdDFUMOrSKMJaVQy0BsyLTzSFm2ErCLKKJcQML00YjSOw3Qq6+aEMPlNTT6xatOnVWxDqDceIvM30tP+WfymF/DTXl6Bosb8hJS+9iTiG5P527lNvhLobs3lA0X+sLpsMfH6QjOq2N+46eEUvGNVpSKjZsrDHwmbwzSFXZFqFxk2bNrnvJ206ZYSztK2tFqMW+EnVi4uN5dNOFzBtUG14rjHP1daU5g46+0NtuszE0q1LsD9jvOr1GlVtwD5iY+r4ei4JCjp0zOdjcrCpoUccgH085r0EIWzet4d4JaPr2U3t223m1oqAtmSRq1z3FNNzKznBUY6WAO0r6PaZ3bmN+W1h5XB+/fOg1OgR8MMX2tH9KiJYADtib0xcjukTlFoarTBFu8EjXzDLNRlkV6fKfrFKhm3Xp8wtMfU0SsVYWvDI0XtJ55lo6jwnNE1eX/Ega5ngJ5p6ajCVhBtBrLAyjE9LV/wAtU/2mcD/DvXchUsPauD1NicZE+lca0gq0yh2bB8us53/D4oewMLYqbfoZK1L+adZaxv0IvC0nzPaZSUFwNv7yQsjO0a1OdR0IinD9ByEm97x60oz2l012smvgepeYmpcjIM0dVUmZqHHfpJSBrxZhgi8DV45T/nx5iLh7nErU4dzdMTF2v4epa6mcraO0NUDsROb/APRHUXTHh0+EjTu6PyuCps2ehspk3fpdOr585PlD6fO0yNNVJttt85q6U2F/cPr9+M3KxWiqyUwYEOfL95dWA6++bB2WKaqhzCNJUHSVqQOa1K8pzF/xJpcW05OQJglyDmYybxaCvLfiRFast+JI1p1bSZBlhOkcUieJnhIYwoZe7W7bxyrRVhKaZAPfvDkzKIRbCRiWaBLEGAQmLVYV3ir1DAR1i/X9JxHpJx9dOrXyxJVVvliN7dhc2J6WM+hFQwPynxbjOgbUcQqqRzBHFJFHVjnr1LE+GZ04+PvlImecwlte4T6XvTbmrpdWbLoy2UE49UbAfSfWeFVUrUlqIwZWFwRtkT5txH0QVF/4lLkDcwVvVOVNmAAJN8frHP4Tatqepr6FiSoDOt+nKQDbwIYGdebg6SZY3crjw+Rjy2zVln+vptClY26b/C1pbXcNRxcjIBF/MW+sZo0up6HHu7xt09UzzO+3CajTNRcA3sbBfgMH4TcSpYWx6uP+rr+tz7po6vRhwLjIsw/3Xv8AOcn+Yem/Iw5muSxHUsdvE25cefeTWmvbcRidtu8YFIne9ugium1g2t/f9o3+JcbysmENoXEz/wAbtLisZpR9QgItOZ1+ksb2m+tS8pqafMJKsunK8k9yzSqaaC/LzGnTbo5aRLidI5PCCdt4QwFXY/fWA7QNxL3gKOwvGQoPWZQO8m1xCvRuN4BqLDYwCUkBwfjPPoFIx7v2gRUItj9oSnqhe1x742oA0rKw7bE/LE+RfxS4RX0tf8zRZlp1mDMUNilewvkZHMF5ge4M+1/jAj9uvlE9doqdem1KsvMr4YHFuoYEbEGxB3BtN4ZdbtmyX3HxP0c1ep1CWrO7hC3KXJYC9ixBOxPnOq/hzwzn1uq1YHqLeghH8zWXnI8ByKPeYfj/AKLaxEKUR+MhwHBVXVbm/MmPWAsLre5JNl2nZ8B0a6fT06YXlCKBygZvbN/G89Xkc2OWGOOLyePw5zkz5c5rf5JtqUUzDOMW74lKLE5sR54l+a/xnkexSsthjfYefec1x/RXu635lFge3dh/qti/jfedUwvAPSDC1pLBwXD9WynlYfv5zoaJ5hFOK8P5WuLAdTuSfjA6aoV2N/M3+Uk/FaRpESoED+OT9n94RWP3eEGSGXaLqRCJWE0qKlGB/Lx9cyeWZXagnpFsyZqI9BsPp84a0ryfSBYP7/KT+JaMLTFsi0kUfeJlHqdW/SFElFtj4RfUVWU3A/tAJyG5G47QT6BSNrdcd+4lqesBycHrDDUiNAKae2M+/r4xhWimo4iqbkeRx+sXHFaZFr5HTtA0nfNhk/e56QdWmSLk28YlptUCxzPcV4gEQkmwG/fOBbxhdFP8SU0dqR5mK2DFVPKpNrKzWsDYidGLGfONfogUXmID/iJVY5Kl1cMVe2bHIv3A7TqeB8eWqHVgFemQGUG4IIBVlNhg5GQMg9pZXbk4bjjMvjeaDRswT1+sDo9QHyMi9vhvK4h8X0wZCT+k5egQGsSRnrOy1ouuJwPFKbK5sZmkbSpLq8xdNrXGDmadHVA7raJQ8igwq01ETXUDoYVK15pD9OFg9OkYtMqS6yZ7rPTSLCVrmyMR0F/hmWE9UHqMO6n5QoPCOIFwbra3jnBtNVc/dpgcCAKK23fqMzfC/fSZKte09UW/iJHMNiJVcHf9v2mkZ+p0N7kAjHRiB5RBqbJe7AYNuY2x79/7xn0n44mkoPWdsIBge0WY8qqO1yd/AnpPj2m4HxDiv+ZNUKhchE5iCCV57KO3L1JvLMLfRcpj7fTzXQ/81lsetxY9N4UflmHqul8AHmBz2M+L+kvoS9CmaquX5SfxARle7X6idF/DD0M/FX8zVJNMAqiZAe/tMe6gj9JeTjywuqzx8mPLLcb+O41FZ6bXXJ6WtY26A95zvH+L1mQEoyKvK4YggeqeblJOAcEW6T6BS4aFHKo9UbZJsP8ASDt0jA4dRIKuiNe3MrAMpyLEg+IHwnPTrLq7fN/Rng2vr82pNRTSqFglOpzLZAfVYCx5QR4ZhNR6KarSVH1FKorswBakvMF5RchVJJIyW3sM9J9R5wMXAtYY2HYeES1Ry3XYY3taXTd5srOt9OE4Zx3UakhAhpAYck3YE/ygd/3E7vhtBaaBRjrk5ud7+M5rhOkU1XYEX52uDsc9D8Z1CMAP6Y/SRjKz4bZ7jactxXS8zXM6ZKgImZqqPMTv74Ycy2mI2EhSw3mlqFI/lMTd/wDTLoVSrNXQG5mQlPM3+H0dpFatMYl7SFFpMDP6yZAnrzSLiWAlVhqcK5j0e4ijgcrXyV32IY79v7TrBV6EEePT3ThPR7gwSvVq3PtObDGA5/lGAb2za87Gs/IFHOAxyVNs47doKM73v9b2/rISoD1JO22N7dNusCrc39LfOS7BRjt+u/37plHAfxUvXXT6cH23d3yB/wApFA9xNQZ8J87/ACmr09UGlVqLYjls7bi3Qb4NvfPpHptpNQdVTqUdO1ZEpstTlKgjnK7AnJsoMSoaetVICaHUX/8AsCIl7Yu1z8p9Hx8uGYayurt4vIvkTk/jHeOntVqnbRO1VfXdeXN+Z2bChVPUk7Yn0b0b4f8AltLQoH2qdNA2P5resbeZMwuBeizK619VyFkzTooSyIwyHZmy7i2Ngt8C+Z05Ykg/H4/ZnDyeXHPL+fUa8Tgy4sb2902oAiWq0y1DayspFql/a5RcgY8ZbVVyu25HKB4kiXrLZeRME9fmfEzzvWBSZSeZTZU9VgR7QxYk9f6wOqbO17nDDoOlx2x+sHqKgA5BsBdj3C/viJajVKCyk7BrHyub26j+3WBl6J+SrU5xh3N7XsbW9dT3sAfG06HT17HlOeh638bzA0ZZjzdiBvffY36jAHfJvHqoKuAL5At2Hb5zKt6mgvf+v6wVc22hKHsgdYLUJNIWeoDuItVpKYSs0ULm8A2m0efCblGmANohoAZqCZaUkSWlbwEDPSDPCbQRTGKcWWMIZEZ/Cad1rG2TVdR3spz+pl+LU25FZStyfafoLk48dhK8Ma9Kp0/41UYIubOLH+kZ1mmFWkUJscMDkZHeFZn5mwspJ+PrH9oWkXcbdvD3QOj0jm4YAWNrC5wO5ImqCV+8zId0yhRm1zuZZ9QB9/SKGvAv63UwhptRc73H6f1lQ1h93MDSp/DGT4bWkkD3D9t/1gLcQ1ZDIAM8w8vADxl62uUDnBvclR2AF/reIcUU8uMkkhffdSfp7yekydW/IUS5N2Cge8L9AD4oe8bXR3XaxQCm7MeX/wDSlR/5CZ6ad3dKnVbi3+6z5HjzMPdAtT5qrOf/AJsR4C/q/ITZGoGbDJAYW6g+tbzBLDztJva6FVFX1kGCLEdvvvGBUDsp6gW/aZ6nmN/v4Rugu0sRs6cS1ZZbSJiXrJNIyK6CKqmekd1NAymnpZhTukXEcgqSACELTIq8HLF5WFImRLkSFmkWUQqmUUQgWEYfBNSKialOtPUup36hWB+Bmrpj/IRcEee8yODqU1epTksKhR+boTYKbdthOpoaRVzbMLSmm0JXuPffEcGn7xmRGgt+VXtBvTEcJgmIkoQroRkffeZ/O3Ny7DqfDF/pNyooIiT0hY+MiMI1mapcLZV9bOwCj1L+F+W8V02lLvznpdhff1FJW/jgX8bzovynqt42HuGZSlpbXHQgiLF2yU0oxiEShjxG3l/f5zVXTWMrVpYuOn3eNG2fpUBY2wb5B+YjtGnnEEFBa43j9BIQ1SNhIL3g3JEqjTQKwlColwZBEKkvYRd60IwizpJRdKkJzQCLC2kUImQsqTLAzSCJDgQNOMCEV0elAdn6kD9Jo3iaNCBpNqIzwP5nvJJgK6X2lBRWvKVEv1iZRwMC8SrcRqruhmRtBbDeJ6mrYgSNFrucZwZ6uoZhNBtBcCS4lefl++0E9XHnCCucRSs9jjYiQ2osbHz+/GDruDt1yLfrApRFz9/GaaCwiFAW8DGhU6TIMzXkfhyiCMK2JpQ7TxksZVmgULQTG8uxlTAHzSeeeYSlplYrJEiTNoPTnnqWMqhimvqWmaNOm0urRXS1LqJIYgyB8CetKc+Iu+qANjNBrmtA1XB3EEaw7wGo1AAzCMXirmk4ZNjGNFrWcgkSjgVGudhBamvy4QbEiYt037jYqajIse/xMzX4kAQPO48/v9Yiazk4vgkfAn956noid5Np1N1HLN4Yz1jdEASKOmwLxhKFpqJRAb9J5MbyyCWbyhBaRhi0UpvGC80PM8EWlHMiFWYyt5JaReBM9aQDJmQC89PSLzQKhmZxtrKZppMb0h9gyZEN8K1N0E0QZxfA+JG1j0Np1Onq3Ekq1pI0R4jpi2QZb8xaA1GsHeEYFTVujWJkaziptbrKcYqKRvmI6E87ARtdR03Bk5kudzHX4eWntAllE0qLjrFm02QpcOtiNpprR0CW5Y6w2X/DEG6gRhzF6iBhkXhCz1VHWQtQHYxPU6IjK/DeDp36mBpSQYsjHvDK00qzGVDSTmCa4gGvKs0CXMujXgEEvaSBLQFJ6enoEoZl+kI9QzUWZ3HfYMl9EfPuFay1V07Gd5w2vcT5fR/90fOfQ+DbTEarS1jG1xMHUV3yDN+vtMTW7wMHUVDezNNngNC3j4zndT7Y8/rOw4R7IlG/pjiMqYvp9owm81GTdJ4cvFk3hjIgdV4u7doZ4vUmlL16hiDOLxvUbTMO8yHkaHBitGMiBDKZZby4nkmhVlMEtxHGgYBEeEvAyYH/2Q=="/>
                                <div className="portfolio-item-inner">
                                    <div className="portfolio-heading">
                                        <h3><a href="/services" id="services">Services</a></h3>
                                    </div>
                                    <ul>

                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            document.getElementById('home').hidden = true
            document.getElementById('owners').hidden = true
            document.getElementById('doctors').hidden = true
            document.getElementById('services').hidden = true
            document.getElementById('appointments').hidden = true
            return (
                <div align='center'>
                    <div className="zag"><h1>{localStorage.getItem('language') == 'uk' ? 'Сторінка адміністратора' : 'Admin page'}</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>{localStorage.getItem('language') == 'uk' ? 'Дата завершення дії SSL сертифіката' : 'Expiration data of SSL sertificate'}: {this.state.ssl}</h2>
                    <br/><h2>{localStorage.getItem('language') == 'uk' ? 'Ви можете отримати резервну копію даних:  ' : 'You can get backup:  '}
                        <br/><button onClick={(e)=>getBackup(e)} className='option'>Get Backup</button></h2>
                    <br/><h2>{localStorage.getItem('language') == 'uk' ? 'Для відновлення данних вкажіть назву файла:  ' : 'Restore database:  '}</h2>
                    <form onSubmit={e => this.onFormRestore(e)}>
                        <input id="restoreFile" name="theRestore" type="text" onChange={this.handleRestoreChange}
                               value={this.state.restoreFile}/>
                        <br/><button type="submit" className='option'>
                            {localStorage.getItem('language') == 'uk' ? 'Отримати' : 'Get Restore'}</button>
                    </form>
                </div>
            )
        };
    }
    onFormRestore(event) {
        const restore = event.target.restoreFile.value;
        {localStorage.getItem('language') == 'uk'?
            adminService.getRestore(restore)
                .then(res => res.json())
                .then(result => alert("Відновлення даних виконано"))
                .catch((error) => console.log( error.response.request._response ) )
            :
            adminService.getRestore(restore)
                .then(res => res.json())
                .then(result => alert("Restore is true"))
                .catch((error) => console.log( error.response.request._response ) )}
    };
}

function getBackup(){
    {localStorage.getItem('language') == 'uk'?
        adminService.getBackup()
            .then(result => alert("Резервна копія збережена на вашому комп`ютері")):
        adminService.getBackup()
            .then(result => alert("Backup is saved in your computer"))}
}

export { HomePage };