import PleaseSignIn from '../components/utils/PleaseSignIn';
import Permissions from '../components/permissions/Permissions';

const PermissionsPage = (props) => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;
