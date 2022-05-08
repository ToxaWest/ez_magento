import { RootState } from '@store/index';
import Table from '@ui/Table';
import { useSelector } from 'react-redux';

function MyAccountDashboardComponent() {
    const { customer } = useSelector((state: RootState) => state.account);
    const tHead = [
        { key: 'firstname', label: 'Name' },
        { key: 'lastname', label: 'Last Name' },
        { key: 'date_of_birth', label: 'Date of birth' },
        { key: 'email', label: 'Email' }
    ];

    return (
        <div>
            <Table data={ [customer] } head={ tHead } isVertical />
        </div>
    );
}

export default MyAccountDashboardComponent;
