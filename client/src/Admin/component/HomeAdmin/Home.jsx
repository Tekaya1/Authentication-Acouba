import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Home() {
    return(
        <div class="sidenav">
            <div class="card">
                <div class="card-body">
                    <div class="logo">

                        <h1 class="logo-caption"><span class="tweak">A</span>dmin</h1>
                    </div>


                    <div id="first" class="main-menu-item" onclick="showhide(this.id);">
                        <a href="#">
                            <i class="fa fa-balance-scale"></i><span>Dashboared</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu">
                            <li class="treeview"><a href="ListCong">Conges</a></li>
                            <li class="treeview"><a href="manage_invoice.php">Manage Invoice </a></li>
                        </ul>
                    </div>
                    <div id="first" class="main-menu-item" onclick="showhide(this.id);">
                        <a href="#">
                            <i class="fa fa-balance-scale"></i><span>Invoice</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu">
                            <li class="treeview"><a href="new_invoice.php">New Invoice</a></li>
                            <li class="treeview"><a href="manage_invoice.php">Manage Invoice </a></li>
                        </ul>
                    </div>




                </div>
            </div>
        </div>
      
        
                
 )


    }
