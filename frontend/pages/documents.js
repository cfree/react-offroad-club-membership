import Gate from '../components/Login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../lib/utils';

const DocumentPage = () => {
  return (
    <Gate redirect="/documents" statusCheck={isNotLocked}>
      <h2>Documents</h2>

      <h3>Club Operations</h3>
      <ul>
        <li>
          <a href="">Bylaws</a>
        </li>
        <li>
          <a href="">Standard Operating Rules</a>
        </li>
      </ul>

      {/* <h3>Monthly Archives</h3>
      <strong>2019</strong>
      <dl>
        <dt>November</dt>
        <dd>
          <a href="">Minutes</a>
          <br />
          <a href="">Newsletter</a>
        </dd>

        <dt>October (Moab)</dt>
        <dd>
          <a href="">Minutes</a>
        </dd>

        <dt>September</dt>
        <dd>
          <a href="">Minutes</a>
          <br />
          <a href="">Newsletter</a>
        </dd>

        <dt>August</dt>
        <dd>
          <a href="">Minutes</a>
          <br />
          <a href="">Newsletter</a>
        </dd>

        <dt>July</dt>
        <dd>
          <a href="">Minutes</a>
          <br />
          <a href="">Newsletter</a>
        </dd>

        <dt>June</dt>
        <dd>
          <a href="">Minutes</a>
          <br />
          <a href="">Newsletter</a>
        </dd>

        <dt>May</dt>
        <dd>
          <a href="">Minutes</a>
          <br />
          <a href="">Newsletter</a>
        </dd>
      </dl> */}
    </Gate>
  );
};

export default DocumentPage;
