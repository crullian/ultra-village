const Styles = theme => ({
  container: {
    width: '100%',
    margin: '0 0 10px 0',
    background: '#fff',
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
    bordeRadius: '3px',
    transition: 'box-shadow .3s cubic-bezier(0.4, 0.0, 0.2, 1)',
    [theme.breakpoints.up('sm')]: {
      width: '380px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '8px'
    }
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '240px'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 90,
    height: 90,
    margin: 10,
    borderRadius: 3
  }
});

export default Styles;