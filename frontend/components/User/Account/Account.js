const Account = () => {
  return <div>
      <p>
        <img src="/static/img/default-vehicle.jpg" height="" />
      </p>
      <p>
        <img src="/static/img/default-user.jpg" height="100" />
      </p>
      <p>Craig Freeman</p>
      <p>User name</p>
      <p>Gender</p>
      <p>Titles (president, webmaster)</p>
      <p>Account status (active/past due/delinquent/inactive/new/removed/resigned)</p>
      <p>Type (full member/associate member/emeritus member/guest)</p>
      <p>Is founding member?</p>
      <p>w (admin, board member, run leader, committee chairperson)</p>
      <p>Joined 2015 (editable by admin/board member)</p>
      <p>Expires: 1/2/2019</p>

      <p>Membership activity log</p>
      <ul>
        <li>Account created - 1/1/2014</li>
        <li>Guest member to full member - 10/1/2014</li>
        <li>2014 dues paid - 10/1/2014</li>
        <li>2015 dues paid - 1/1/2015</li>
        <li>Past due - 1/1/2016</li>
        <li>Delinquent - 3/1/2016</li>
        <li>Inactive - 6/1/2016</li>
        <li>Full member to guest member - 1/1/2017</li>
        <li>Guest member to full member - 7/1/2018</li>
        <li>2018 dues paid - 7/1/2018</li>
        <li>Title added: President - 11/1/2018</li>
        <li>Title removed: President - 11/1/2018</li>
        <li>Removed from membership - 12/1/2018</li>
      </ul>

      <p>Event activity log</p>
      <ul>
        <li>Attended Kelly Flats run as a rider - 1/1/2013</li>
        <li>Attended Kelly Flats run as a rider - 11/1/2013</li>
        <li>Attended Kelly Flats run as a driver - 12/1/2013</li>
        <li>MUST BECOME A MEMBER</li>
        <li>Attended <a href="">Monthly Meeting</a> - 1/1/2014</li>
      </ul>

      <address>
        Address<br/>
        Address
      </address>
      <p>Phone</p>
      <p>Email</p>
      <p>Birthday</p>
      <p>
        Emergency Contact:<br />
        Name<br/>
        Phone<br />
        Relation
      </p>
      <p>
        Vehicle Information (repeater):<br/>
        Year Make Model Trim
        Mods
        Comfort level

        Select primary vehicle:
      </p>
      <p>
        Misc Information:<br />
        Okay to appear in public photos?
        Shirt size
      </p>
    </div>;
}

export default Account;
