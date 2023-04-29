import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { manufacturerCompanys, pricesRange } from '../../../utils/asideData';
import { companysTitles, pricesRangeSet } from '../../../storeToolkit/companySlice';

import './Aside.scss';

export const Aside: React.FC = () => {
    const dispatch = useDispatch();

    const [checkboxCompanys,setCheckboxCompanys] = useState<string[]>([]);
    const [checkboxPrices,setCheckboxPrices] = useState<string[]>([]);

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value,checked} = e.target;
        if(checked) {
            setCheckboxCompanys(prev =>[...prev,value])
        }else{
            setCheckboxCompanys(prev =>[...prev.filter(elem=> elem!==value)])
        }
    }

    useEffect(()=>{
        dispatch(pricesRangeSet(checkboxPrices));
        dispatch(companysTitles(checkboxCompanys))
    },[checkboxCompanys,checkboxPrices])

    const handlePricesChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value,checked} = e.target;
        if(checked) {
            setCheckboxPrices(prev =>[...prev,value])
        }else{
            setCheckboxPrices(prev =>[...prev.filter(elem=> elem!==value)])
        }
    }

    const checkboxPrice = pricesRange.map(elem =>{
        return <p key={elem.id}>
            <input onChange={handlePricesChange} value={elem.value} type="checkbox" name={elem.id} id={elem.id} />
            <label htmlFor={elem.id}>{elem.title}</label>
            <br />
        </p>

    });

    const checkboxCompany = manufacturerCompanys.map(elem =>{
        return <p key={elem}>
            <input onChange={handleCompanyChange} type="checkbox" value={elem} name={elem} id={elem} />
            <label htmlFor={elem}>{elem}</label>
        </p>
    });

    return (
        <div className='aside-nav'>
            <h3>sort</h3>
            <NavLink to={'/catalog/sorted=chip'}>
                <p>from chip</p>
            </NavLink>
            <NavLink to={'/catalog/sorted=expensive'}>
                <p>from expensive</p>
            </NavLink>
            <NavLink to={'/catalog/sorted=a-z'}>
                <p>from a to z</p>
            </NavLink>
            <NavLink to={'/catalog/sorted=z-a'}>
                <p>from z to a</p>
            </NavLink>
            <h3>filters</h3>

            <h2>manufacturer</h2>
            {checkboxCompany}

            <h2>price</h2>
            {checkboxPrice}

            <hr />
        </div>
    );
}

