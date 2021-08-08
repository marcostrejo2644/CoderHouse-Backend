const indexControllers = {};

indexControllers.renderForm = async (req, res) => {
  try {
    res.render('form');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default indexControllers;
