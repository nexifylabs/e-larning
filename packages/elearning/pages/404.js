import React from 'react';
import Link from 'next/link';

const iceCreams = [
    { id: 1, width: 50, duration: 8, left: '20%', top: '10%' },
    { id: 2, width: 60, duration: 10, left: '60%', top: '20%' },
    { id: 3, width: 25, duration: 30, left: '10%', top: '30%' },
    { id: 4, width: 40, duration: 18, left: '40%', top: '15%' },
    { id: 5, width: 50, duration: 20, left: '15%', top: '70%' },
    { id: 6, width: 40, duration: 20, left: '25%', top: '70%' },
    // { id: 7, width: 30, duration: 20, left: '45%', top: '70%' },
    { id: 8, width: 25, duration: 20, left: '65%', top: '70%' },
    { id: 9, width: 30, duration: 20, left: '75%', top: '70%' },
    { id: 10, width: 25, duration: 20, left: '85%', top: '70%' },
    { id: 11, width: 30, duration: 20, left: '90%', top: '70%' },
    { id: 12, width: 20, duration: 20, left: '95%', top: '70%' },
    { id: 13, width: 30, duration: 20, left: '2%', top: '70%' },
    { id: 14, width: 70, duration: 20, left: '5%', top: '30%' },
    { id: 15, width: 30, duration: 20, left: '97%', top: '20%' },
    { id: 16, width: 25, duration: 20, left: '8%', top: '10%' },
];

const Custom404 = () => {
    return (
        <>
            <div className='bluemoon'>
                <div className='content-container'>
                    <img src='/logo-horizontal.png' />
                    <p class='title'>Oh no, algo deu errado!</p>
                    <p class='subtitle'>
                        Você está digitando o URL incorretamente ou seu
                        pagamento foi recusado. <br />
                        Por favor, verifique o e-mail com o qual você se
                        registrou.
                    </p>

                    <div align='center'>
                        <Link href='/'>
                            <a class='btn-back' href='#'>
                                Voltar ao Escola Sorvete
                            </a>
                        </Link>
                    </div>
                </div>

                {iceCreams.map((iceCream) => (
                    <img
                        key={iceCream.id}
                        src='https://media.discordapp.net/attachments/1076613189795586122/1083484472491655319/sorvete-logo.png'
                        alt={`Ice Cream ${iceCream.id}`}
                        className='falling-ice-cream'
                        style={{
                            width: iceCream.width,
                            animationDuration: `${iceCream.duration}s`,
                            left: iceCream.left,
                            top: iceCream.top,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default Custom404;
