import AddButton from './AddButton';
import Dialog from '../Dialog';
import { useState } from 'react';

const AddMain = () => {
  const [active, setActive] = useState(false);

  const handleOpen = () => setActive((old) => !old);

  return (
    <>
      <Dialog open={active}>
        <form>Hrllo</form>
      </Dialog>
      <AddButton onClick={handleOpen} />
    </>
  );
};

export default AddMain;
