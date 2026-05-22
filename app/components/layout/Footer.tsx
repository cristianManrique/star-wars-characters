const Footer = () => {
  return (
    <footer className="bg-black/80 py-1 px-4">
      <p className="text-xs font-semibold text-sw-yellow">
        &copy; {new Date().getFullYear()} Crisman Design Inc.
      </p>
    </footer>
  );
};

export default Footer;
