import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export const SemCard = ({title,subtitle}) => {
  const navigate=useNavigate()
  const {coursecode}=useParams()

  const handleOnClick=()=>(
    navigate(`/course/${coursecode}/semester/${title}`)
  )

  return (


    <StyledWrapper>
      <div className="section_our_solution">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="our_solution_category">
              <div className="solution_cards_box">
                <div className="solution_card">
                  <div className="hover_color_bubble" />
                  <div className="so_top_icon text-black text-center">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                </svg>

                  </div>
                  <div className="solu_title text-center">
                    <div>{title}</div>
                  </div>
                  <div className="solu_description text-center">
                    <p>
                    {subtitle}
                    </p>
                    <button onClick={handleOnClick} className="read_more_btn" type="button">View Papers</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .section_our_solution .row {
    align-items: center;
  }

  .our_solution_category {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .our_solution_category .solution_cards_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .solution_cards_box .solution_card {
     width: 100%;
  max-width: 320px;
  flex: 1 1 300px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.2),
      0 5px 15px 0 rgba(37, 44, 97, 0.15);
    border-radius: 15px;
    margin: 8px;
    padding: 10px 15px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    min-height: 265px;
    transition: 0.7s;
  }

  .solution_cards_box .solution_card:hover {
    background: #309df0;
    color: #fff;
    transform: scale(1.1);
    z-index: 9;
  }

  .solution_cards_box .solution_card:hover::before {
    background: rgb(85 108 214 / 10%);
  }

  .solution_cards_box .solution_card:hover .solu_title h3,
  .solution_cards_box .solution_card:hover .solu_description p {
    color: #fff;
  }

  .solution_cards_box .solution_card:before {
    content: "";
    position: absolute;
    background: rgb(85 108 214 / 5%);
    width: 170px;
    height: 400px;
    z-index: -1;
    transform: rotate(42deg);
    right: -56px;
    top: -23px;
    border-radius: 35px;
  }

  .solution_cards_box .solution_card:hover .solu_description button {
    background: #fff !important;
    color: #309df0;
  }

  .solution_card .so_top_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 12px auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    overflow: hidden;
  }

  .solution_card .solu_title div {
    color: #212121;
    font-size: 1.3rem;
    margin-top: 13px;
    margin-bottom: 13px;
  }

  .solution_card .solu_description p {
    font-size: 15px;
    margin-bottom: 15px;
  }

  .solution_card .solu_description button {
    border: 0;
    border-radius: 15px;
    background: linear-gradient(
      140deg,
      #42c3ca 0%,
      #42c3ca 50%,
      #42c3cac7 75%
    ) !important;
    color: #fff;
    display: flex;
  justify-content: center; 
  align-items: center;     
  width: 100%;
    font-weight: 500;
    font-size: 1rem;
    padding: 5px 16px;
  }

  .our_solution_content div {
    text-transform: capitalize;
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }

  .our_solution_content p {
  }

  .hover_color_bubble {
    position: absolute;
    background: rgb(54 81 207 / 15%);
    width: 100rem;
    height: 100rem;
    left: 0;
    right: 0;
    z-index: -1;
    top: 16rem;
    border-radius: 50%;
    transform: rotate(-36deg);
    left: -18rem;
    transition: 0.7s;
  }

  .solution_cards_box .solution_card:hover .hover_color_bubble {
    top: 0rem;
  }

  .solution_cards_box .solution_card .so_top_icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .solution_cards_box .solution_card .so_top_icon img {
    width: 40px;
    height: 50px;
    object-fit: contain;
  }

  /*start media query*/
  @media screen and (min-width: 320px) {
    .sol_card_top_3 {
      position: relative;
      top: 0;
    }

    .our_solution_category {
      width: 100%;
      margin: 0 auto;
    }

    .our_solution_category .solution_cards_box {
      flex: auto;
    }
  }

  @media only screen and (min-width: 768px) {
    .our_solution_category .solution_cards_box {
      flex: 1;
    }
  }

  @media only screen and (min-width: 1024px) {
    .sol_card_top_3 {
      position: relative;
      top: -3rem;
    }

    .our_solution_category {
      width: 80%;
      margin: 0 auto;
    }
  }`;

export default SemCard;
