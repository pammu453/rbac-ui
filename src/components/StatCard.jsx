import React from 'react';

const StatCard = ({ title, value, gradientFrom, gradientTo, Icon }) => {
    return (
        <div
            className={`flex flex-col p-3 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white gap-4 md:w-72 w-full rounded-md shadow-lg`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-sm uppercase">{title}</h3>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <Icon className="text-5xl" />
            </div>
        </div>
    );
};

export default StatCard;
