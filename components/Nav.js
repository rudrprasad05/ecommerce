import React from 'react'
import { HiBuildingStorefront, 
    HiOutlineHomeModern, 
    HiOutlineIdentification, 
    HiOutlineCurrencyDollar,
    HiOutlineCircleStack,
    HiListBullet,
    HiOutlineCog8Tooth } from 'react-icons/hi2'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
    const inactiveLink = "flex gap-5 items-center rounded-lg shadow-md"
    const activeLink = inactiveLink + "bg-white text-blue-500"
    const router = useRouter()
    const pathname = router.pathname

    return (
        <nav className='px-8 py-5 grid gap-5 h-min capitalize'>
            <Link href={"/"}>
                <div className={inactiveLink}>
                    <HiBuildingStorefront size={30}/>
                    <span>Ecommerce</span>
                </div>
            </Link>

            <Link href={"/"}>
                <div className={pathname === '/' ? activeLink : inactiveLink}>
                    <HiOutlineIdentification size={30}/>
                    <span>Dashboard</span>
                </div>
            </Link>

            <Link href={"/orders"}>
                <div className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                    <HiOutlineCurrencyDollar size={30}/>
                    <span>Orders</span>
                </div>
            </Link>

            <Link href={"/products"}>
                <div className={pathname.includes('/products') ? activeLink : inactiveLink }>
                    <HiOutlineCircleStack size={30}/>
                    <span>Products</span>
                </div>
            </Link>

            <Link href={"/categories"}>
                <div className={pathname.includes('/categories') ? activeLink : inactiveLink }>
                    <HiListBullet size={30}/>
                    <span>categories</span>
                </div>
            </Link>

            <Link href={"/settings"}>
                <div className={pathname.includes('/settings') ? activeLink : inactiveLink }>
                    <HiOutlineCog8Tooth size={30}/>
                    <span>Settings</span>
                </div>
            </Link>
        
        </nav>
    )
}

export default Nav