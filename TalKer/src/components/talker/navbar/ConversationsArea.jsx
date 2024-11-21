import React from 'react';
import { Box, Typography, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ConversationsArea = ({ groupedConversations, activeConversationId, handleItemClick, handleClickMore }) => {
    let conversationIndex = 0; // Index to track the position across groups

    const formatGroupKey = (key) => {
        if (key === 'previous7Days') return 'Previous 7 Days';
        if (key === 'previous30Days') return 'Previous 30 Days';
        return key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter for other keys
    };

    return (
        <div>
            {Object.keys(groupedConversations).map((groupKey) => {
                const group = groupedConversations[groupKey];
                if (group.length === 0) return null; // Skip empty groups

                return (
                    <Box key={groupKey} sx={{ mb: 3 }}>
                        {/* Render group heading */}
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#ECECEC', mb: 1, fontSize: '12px', ml: '20px', mt: '12px' }}>
                            {formatGroupKey(groupKey)}
                        </Typography>

                        {/* Render conversations in this group */}
                        {group.map((convo) => {
                            const currentIndex = conversationIndex++; // Update global conversation index

                            return (
                                <ListItem
                                    key={convo.conversation_id}
                                    onClick={() => handleItemClick(currentIndex, convo.conversation_id)}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        py: activeConversationId === convo.conversation_id ? '0px' : '8px',
                                        px: '12px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            backgroundColor: activeConversationId === convo.conversation_id ? '#212121' : 'transparent',
                                            borderRadius: '8px',
                                            transition: 'background-color 0.3s ease',
                                        }}
                                    >
                                        <ListItemText
                                            primary={convo.title}
                                            sx={{
                                                mr: '5px',
                                                maxWidth: activeConversationId === convo.conversation_id ? 'calc(100% - 40px)' : '100%',
                                                px: 1,
                                                my: 0,
                                            }}
                                            primaryTypographyProps={{
                                                sx: {
                                                    fontSize: '14px',
                                                    color: '#ECECEC',
                                                    fontWeight: 400,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                },
                                            }}
                                        />
                                        {activeConversationId === convo.conversation_id && (
                                            <ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
                                                <IconButton onClick={handleClickMore}>
                                                    <MoreHorizIcon color="primary" />
                                                </IconButton>
                                            </ListItemIcon>
                                        )}
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </Box>
                );
            })}
        </div>
    );
};

export default ConversationsArea;
