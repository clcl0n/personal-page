import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import profilePhoto from '../assets/images/profile_photo.jpg';

const Home: FunctionComponent = () => (
    <div className="flex justify-center p-12">
        <div className="mx-2">
            <div className="mb-2">
                <img
                    className="rounded-full pb-2"
                    width="260"
                    height="260"
                    src={profilePhoto}
                    alt=""
                />
                <h1 className="font-bold text-2xl">Patrik František Baláž</h1>
            </div>
            <div className="border-b border-gray-300 py-2 text-sm text-gray-800">
                <span className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-1" icon="map-marker-alt" />
                    <p>Slovakia, Bratislava</p>
                </span>
                <span className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-1" icon="envelope" />
                    <a href="mailto: patrik.f.balaz@outlook.com">
                        patrik.f.balaz@outlook.com
                    </a>
                </span>
                <span className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-1" icon="link" />
                    <a href="www.patrikfrantisekbalaz.com">
                        www.patrikfrantisek.balaz.com
                    </a>
                </span>
            </div>
        </div>
        <div className="flex flex-col border rounded-md border-gray-300 p-4 mx-2">
            <h2 className="text-lg font-bold pb-2">Hi, I&apos;m Patrik 👋</h2>
            <p>
                I&apos;m passionate Full Stack web developer from little country
                in the middle of Europe called slovakia.
            </p>
        </div>
    </div>
);

export default Home;
