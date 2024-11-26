import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'flowbite-react';

const TableCard = ({ title, gradientFrom, gradientTo, data, columns, link, rows }) => {
    return (
        <div className="flex flex-col w-full md:w-auto shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div
                className={`flex justify-between items-center p-3 text-lg font-semibold bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white rounded-t-md`}
            >
                <h1 className="capitalize">{title}</h1>
                <Button outline gradientDuoTone="purpleToPink">
                    <Link to={link}>See all</Link>
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        {columns.map((col, idx) => (
                            <Table.HeadCell key={idx}>{col.header}</Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data.slice(0, rows).map((item, idx) => (
                            <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                {columns.map((col, colIdx) => (
                                    <Table.Cell key={colIdx}>{col.accessor(item)}</Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default TableCard;
