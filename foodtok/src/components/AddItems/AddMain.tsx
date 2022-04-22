import { useState } from 'react';
import AddButton from './AddButton';
import Dialog from '../Dialog';

const AddMain = () => {
  const [active, setActive] = useState(false);

  const handleOpen = () => setActive((old) => !old);

  return (
    <>
      <Dialog open={active}>
        <form>Hey hey!</form>
      </Dialog>
      <AddButton onClick={handleOpen} />
    </>
  );
};

export default AddMain;
