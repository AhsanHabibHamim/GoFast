import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Services';
import ClientsLogoMerque from './ClientsLogoMerque/ClientsLogoMerque';
import OurTeam from './OurTeam/OurTeam';
import BeMarchent from './BeMarchent/BeMarchent';
import Benifit from './Benifit/Benifit';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <ClientsLogoMerque></ClientsLogoMerque>
           <Benifit></Benifit>
           <OurTeam></OurTeam>
           <BeMarchent></BeMarchent>
        </div>
    );
};

export default Home;