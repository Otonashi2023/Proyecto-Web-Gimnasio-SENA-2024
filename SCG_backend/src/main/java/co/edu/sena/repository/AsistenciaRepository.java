package co.edu.sena.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.edu.sena.models.entity.Asistencia;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, BigInteger>{

}
