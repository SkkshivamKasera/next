import React from 'react';
import Link from "next/link";
import {LogOutBtn} from "@/components/Client";

const Header = () => {
    return (
        <div className="header">
            <div>
                <h2>ToDo</h2>
            </div>
            <article>
                <Link href="/">Home</Link>
                <Link href="/profile">Profile</Link>
                <LogOutBtn/>
            </article>
        </div>
    );
};

export default Header;