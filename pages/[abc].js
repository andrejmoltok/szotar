import szotar from './api/szotar.js';
import Router from 'next/router';
import { useState, useEffect } from 'react';

export async function getStaticPaths({}) {
    const paths = szotar.map((entry) => ({
        params: { halan: `${entry.halan.charAt(0)}/${entry.halan}`}
    }));
    return { paths, fallback: false};
}

export async function getStaticProps({params}) {
    const wordData = szotar.find((entry) => entry.halan === params.halan);
    return { props: { wordData }};
}

export default function ABC({wordData}) {

    const {halan, bekuldo2, magyarazo2, magy, datum2} = wordData;

    return (
        <>
        <div>DEMO</div>
        </>
    )
}