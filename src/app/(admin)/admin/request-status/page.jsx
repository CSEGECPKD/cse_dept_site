import RequestStatusList from '@/components/admin/request-status/RequestStatusList';

const SavedPage = () => {
    return (
        <div className="py-20 px-20 space-y-2.5">
            <h1 className="text-3xl font-medium">REQUEST STATUS</h1>
            <RequestStatusList />
        </div>
    );
};

export default SavedPage;
