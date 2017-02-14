clc;
clear all;
%%%%%%%%%%%%%%%%%%%init json values in stations_list
fname = 'example_json.json';
fid = fopen(fname);
raw = fread(fid,inf);
str = char(raw');
fclose(fid);

data = JSON.parse(str);
a = size(data.data);
freq_num = a(2);

for i = 1:freq_num
    stations_list(i,1) = double(data.data{i}.freq);
    stations_list(i,2) = double(data.data{i}.priority);
end
adStatus = data.adStatus;

shalom = 'hello liran';
fileID = fopen('D:\liran.txt','wt');
fprintf(fileID,'%s\n',shalom);
fclose(fileID);
disp('hello');
