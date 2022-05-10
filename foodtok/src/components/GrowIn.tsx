import ctl from '@netlify/classnames-template-literals';

type props = JSX.IntrinsicElements['div'] & {
  duration: number;
  open: boolean;
  height: string;
};

const GrowIn = ({ duration, open, height, children }: props) => (
  <div
    className={ctl(`
    overflow-hidden
    `)}
    style={{
      maxHeight: open ? height : '0px',
      visibility: !open ? 'hidden' : undefined,
      transition: `
        max-height ${duration * 0.75}ms,
        overflow ${duration}ms ${duration}ms
        `,
    }}
  >
    {children}
  </div>
);

GrowIn.defaultProps = {
  duration: 200,
  open: false,
  height: '6em',
};

export default GrowIn;
