import { useEffect, useRef, useState } from "react"
import { Accordion, Button, ButtonGroup, Dropdown } from "react-bootstrap"
import { PropertyType } from "../../constant/PropertyType";
import './filter.scss'
import PropertyService from "../../service/property";
import States from '../../states.json'
const PropertyFilter = ({ onSearch }) => {
    const [location, setLocation] = useState([])
    const formRef = useRef(null);
    const applySearch = () => {
        let form = formRef.current;
        let searchInfo = {
            minPrice: parseFloat(form["min"].value) || 0,
            maxPrice: parseFloat(form["max"].value) || 0,
            propertyType: form["propertyType"].value,
            //location: form["location"].value,
            numberOfRoom: parseFloat(form["numberOfRoom"].value)
        }
        console.log(searchInfo)
        PropertyService.searchProperty(searchInfo).then(res => {
            if (typeof onSearch === "function")
                onSearch(res);
        })
    }
    const loadLocation = () => {

    }
    useEffect(() => {
        applySearch();
    }, [])
    return <>
        <div className={"col-7 m-auto"}>
            <div className={"flex justify-content-evenly items-center space-x-4 mt-5"}>
                <form ref={formRef} className={"flex justify-content-evenly items-center space-x-4"}>
                    <input
                        className="flex-grow h-12 px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Min" name="min" type="number" />
                    <input
                        className="flex-grow h-12 px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        type="number" placeholder="Max" name="max" />

                    <select name="propertyType"
                        className="flex-grow h-12 px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
                        <option value={""} key="all">All</option>
                        {Object.keys(PropertyType).map(k => {
                            return <option value={k} key={k}>{PropertyType[k]}</option>
                        })}
                    </select>
                    <select
                        className="flex-grow h-12 px-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        name="numberOfRoom">
                        {
                            <>
                                <option value={0} key={0}>All</option>
                                {
                                    Array.from({ length: 10 }).map((o, i) => {
                                        return <option value={i + 1} key={i}> {i + 1}</option>
                                    })
                                }
                            </>
                        }
                    </select>
                </form>
                <button className="flex-grow h-12 px-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
                    onClick={applySearch}>Apply
                </button>
            </div>
        </div>
    </>
}

export default PropertyFilter