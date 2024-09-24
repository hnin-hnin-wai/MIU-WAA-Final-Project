package cs545.property.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Customer {
    @Id
    @GeneratedValue
    Long id;
    String name;

    LocalDate createdDate = LocalDate.now();

}
