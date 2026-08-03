'use client';

import React from 'react';
import ListItem from '../ListItem';
import { deleteAdvisoryBoardMember } from '@/actions/advisoryboard.action';

const AdvisoryBoardList = ({ advisoryBoardList }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-right text-3xl font-medium">ALREADY ON SITE</h2>
            <ul className="space-y-1">
                {advisoryBoardList.map((item) => (
                    <ListItem
                        key={item._id}
                        title={item.name}
                        handleDelete={async () => {
                            await deleteAdvisoryBoardMember(item._id);
                        }}
                    />
                ))}
                {advisoryBoardList.length === 0 && (
                    <p className="text-center text-red-500">No Data</p>
                )}
            </ul>
        </div>
    );
};

export default AdvisoryBoardList;
