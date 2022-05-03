import Header from './header'
import Footer from './footer'
import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function Layout({children}: Props) {

    return <div>
    <div>
        <Header />
    </div>
    <div className="flex-grow">
        {children}
    </div>
    <Footer />

</div>
}