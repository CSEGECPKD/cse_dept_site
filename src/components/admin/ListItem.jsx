'use client';

import { useMutation } from '@tanstack/react-query';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';

const ListItem = ({ title, type, remark, handleDelete }) => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async () => {
            await handleDelete();
        },
        onSuccess: () => {
            router.refresh();
        },
    });
    return (
        <li className="bg-[#E9E9E8] p-4">
            <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-[#696969]">{title}</p>
                <div className="flex gap-2.5">
                    {/* TODO:EDIT OPTION */}
                    {/* <SubmitButton label="EDIT" /> */}
                    {type === 'request-status' && (
                        <SubmitButton label="APPROVED" />
                    )}
                    {type === 'saved' ||
                        (type === 'request-status' && (
                            <SubmitButton label="VIEW" />
                        ))}

                    {type !== 'request-status' && (
                        <SubmitButton
                            onClick={mutation.mutate}
                            disabled={mutation.isPending}
                            label="DELETE"
                        />
                    )}
                </div>
            </div>
            {remark && (
                <div className="flex text-[#696969] text-lg">
                    <span className="block shrink-0">REMARK : &nbsp;</span>
                    <span className="block flex-1">{remark}</span>
                </div>
            )}
        </li>
    );
};

export default ListItem;
