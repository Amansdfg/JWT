package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findRequestsByReceiver_Id(Long receiverId);
}
