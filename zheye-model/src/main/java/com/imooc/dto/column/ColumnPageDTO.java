package com.imooc.dto.column;

import com.imooc.dto.file.ImageFileDTO;
import com.imooc.dto.user.UserDetailDTO;
import lombok.Data;

import java.util.Date;

/**
 * 专栏分页DTO
 *
 * @author wzy
 * @date 2024/11/20 20:30
 */
@Data
public class ColumnPageDTO {
    private Long id;
    private String title;
    private String description;
    private ImageFileDTO avatar;
    private UserDetailDTO author;
    private Date createTime;
}
